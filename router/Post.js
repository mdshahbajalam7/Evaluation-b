const { Router } = require("express");

const PostModel = require("../models/Post");

const PostRouter = Router();

PostRouter.get("/post", async (req, res) => {
  const userID_making_req = req.body.userID;
  try {
    let new_notes = await PostModel.find();
    res.status(201).json({
      Message: "get all the data",
      new_notes: new_notes,
      userID: userID_making_req,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json("someThing went wrong");
  }
});

PostRouter.post("/create", async (req, res) => {
  const { title, body, device, userID } = req.body;
  try {
    const new_note = new PostModel({ title, body, device, userID });
    await new_note.save();
    res.status(201).json({
      Message: "new Note data Create successfully",
      new_note: new_note,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json("someThing went wrong");
  }
});

PostRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const node = await PostModel.findById(id);
  console.log(node);
  const userID_in_note = node.userID;
  const userID_making_req = req.body.userID;
  console.log("userID_in_note",userID_in_note,"userID_making_req",userID_making_req)
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ message: "You are not authorized" });
    } else {
      const updatenotes = await PostModel.findByIdAndUpdate(
        { _id: id },
        payload
      );
      updatenotes.save().then(() => {
        res
          .status(201)
          .json({ message: "Update Successfully", updatenotes: updatenotes });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json("someThing went wrong");
  }
});

PostRouter.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  const node = await PostModel.findById(id);
  const userID_in_note = node.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_in_note !== userID_making_req) {
      res.send({ message: "You are not authorized" });
    } else {
      const getidauth = await PostModel.findById({ _id: id });
      res.status(200).json({
        message: "get data with id Successfully",
        getidauth: getidauth,
      });
    }
  } catch (error) {
    res.status(401).json(error.message);
    console.log(error);
  }
});

PostRouter.delete("/deletedata/:id", async (req, res) => {
  const id = req.params.id;
  const node = await PostModel.findById(id);
  const userID_in_note = node.userID;
  const userID_making_req = req.body.userID;
  // console.log("userID_in_note",userID_in_note ,"userID_making_req",userID_making_req );
  try {
    if (userID_in_note !== userID_making_req) {
      res.send({ message: "You are not authorized" });
    } else {
      const deletenotes = await PostModel.findByIdAndDelete({ _id: id });
      res.status(201).json({
        message: "deletenotes Successfully",
        deletenotes: deletenotes,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json("someThing went wrong");
  }
});

module.exports = PostRouter;
