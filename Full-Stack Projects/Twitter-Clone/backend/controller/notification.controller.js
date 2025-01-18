import Notification from "../model/notification.model.js";

// get all notifications
export const getNotifications = async(req, res) =>{
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({to:userId}).populate({
            path: "from",
            select: "username profileImg"
        });

        await Notification.updateMany({to: userId}, {read: true});

        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotification function", error.message);
        res.status(500).json({error : "Internal server error"});
    }
};


// delete notifications
export const deleteNotifications = async(req, res) =>{
    try {
        const userId = req.user._id;

        await Notification.deleteMany({to:userId});

        res.status(200).json({message : "Notifications deleted successfully"});
        
    } catch (error) {
        console.log("Error in deleteNotification function", error.message);
        res.status(500).json({error : "Internal server error"});
    }
}


// delete a single notification
// export const deleteSingleNotification = async(req, res) =>{
//     try {
//         // get notification id
//         const notificationId = req.params.id;
//         const userId = req.user._id;
//         // find notification with id
//         const notification = await Notification.findById(notificationId);
//         // if notify not found
//         if(!notification){
//             return res.status(404).json({error : "Notification not found"});
//         }
//         // check if user is allowed to delete notifi
//         if(notification.to.toString() !== userId.toString()){
//             return res.status(403).json({error: "You are not allowed to delete this notification"});
//         }
//         // delete notification
//         await Notification.findByIdAndDelete(notificationId);
//         res.status(200).json({message : "Notification deleted successfully"})
//     } catch (error) {
//         console.log("Error in deleteSingleNotification function", error.message);
//         res.status(500).json({error : "Internal server error"});
//     }
// }