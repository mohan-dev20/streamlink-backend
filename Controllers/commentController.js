import Comment from "../Modals/comment.js";
import  User  from "../Modals/Auth.js";

export const addComment = async (req, res) => {
  try {
    const { videoId, userId, city, text } = req.body;

    const user = await User.findById(userId);
       if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const comment = await Comment.create({
      videoId,
      userId,
      city,
      text,
      userName: user.username,
    });

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const dislikeComment = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    comment.dislikes += 1;

    if (comment.dislikes >= 2) {
      await Comment.findByIdAndDelete(req.params.id);

      return res.status(200).json({
        message: "Comment removed after 2 dislikes",
        success:true,
        deleted:true,
      });
    }

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const likeComment = async (req ,res) => {
  try{
    const comment = await Comment.findById(req.params.id);
    if (!comment){
      return res.status(404).json({message:"Comment not found",});
    }
    comment.likes +=1;
    await comment.save();
    res.status(200).json(comment);

  }catch (error){
    res.status(500).json({message: error.message,});
  }
};
export const deleteComment =async(req ,res) => {
  try{
    await Comment.findByIdAndDelete(req.params.id);
    res.json({success:true,});
    }catch (error){
      res.status(500).json({message:error.message,});
    }
};
export const editComment = async(req ,res) => {
  try{
    const {text} = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.id,{text},{new:true});
    res.json({success:true, comment,});
  }catch (error){
    res.status (500).json({message:error.message,});
  }
};