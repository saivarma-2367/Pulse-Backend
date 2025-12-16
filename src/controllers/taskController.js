import Task from "../models/Task.js";

export const createTask = async(req,res)=>{
    const {title,priority}=req.body;

    if (!title) {
    return res.status(400).json({ message: "Task title is required" });
  }

    const task=Task.create({
        user:req.user._id,
        title,priority
    });

    res.status(201).json(task);
};

export const getTasks = async(req,res)=>{
    const Tasks=await Task.find({user:req.user._id}).sort({createdAt:-1});
    res.json(Tasks);
};

export const updateTask =async(req,res)=>{
    const task=await Task.findById(req.params.id);
    if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  task.status=req.body.status || task.status;
  task.priority=req.body.priority || task.priority;
  task.title=req.body.title ||task.title;

  const updatedTask= await task.save();

  res.json(updatedTask);
};

export const deleteTask=async(req,res)=>{
    const task=await task.findOne(req.params.id);

    if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await task.deleteOne();

  res.json({ message: "Task removed" });
};