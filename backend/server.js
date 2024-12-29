const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,  
});
const User = mongoose.model('User', userSchema);

// fct Signup
const Signup = async (req, res) => {
  const data = req.body; 
  console.log(data);

  if (!data.name || !data.email || !data.password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const salt = bcrypt.genSaltSync(10);
  const cryptedPass = await bcrypt.hash(data.password, salt); // Encrypt password
  const usr = new User({
    ...data,
    password: cryptedPass,
  });

  try {
    const savedUser = await usr.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(400).json({ message: 'Error saving user', error: err });
  }
};

// fct Signin
const Signin = async (req, res) => {
  const data = req.body;

  const user = await User.findOne({ email: data.email });
  if (!user) {
    return res.status(404).json({ message: 'Email or password not valid' });
  }

  const validPass = bcrypt.compareSync(data.password, user.password);
  if (!validPass) {
    return res.status(401).json({ message: 'Email or password invalid' });
  }

  const payload = {
    _id: user.id,
    email: user.email,
    name: user.name,
  };

  const token = jwt.sign(payload, 'tokenoumayma', { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', mytoken: token });
};

// model cour
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
});

const Course = mongoose.model('Course', courseSchema);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// creé cour
const createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const newCourse = new Course({
      title,
      description,
      price,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create course' });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// modifier Cour
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const updatedCourse = {
      title,
      description,
      price,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    };
    const course = await Course.findByIdAndUpdate(id, updatedCourse, { new: true });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update course' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
};

// route
app.post('/api/courses', upload.single('image'), createCourse);
app.get('/api/courses', getCourses);
app.put('/api/courses/:id', upload.single('image'), updateCourse);
app.delete('/api/courses/:id', deleteCourse);
app.post('/register', Signup);
app.post('/login', Signin);


const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
