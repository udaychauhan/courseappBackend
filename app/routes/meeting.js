const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const meetingController = require("./../../app/controllers/meetingController");
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meeting`;

    // defining routes.

    //params : authtoken,userId
    app.post(`${baseUrl}/getAllMeetingsForUser`,auth.isAuthorized, meetingController.getAllMeetingsForUser);
     /**
	* @api {post} /api/v1/meeting/getAllMeetingsForUser Get MeetingBy UserId
	* @apiVersion 0.0.1
    * @apiGroup  Meeting
    
    * @apiParam {string} autToken Token generated from Login. 
    * @apiParam {string} meetingId 
    * @apiParam {string} userId 
	*
	  @apiSuccessExample {json} Success-Response:
	*  {
	*   "error": false,
	*   "message": "Meeting Found.",
	*   "status": 200,
	*   "data": [
    *				{
    *					Information about the meeting
    *				}
	*   		]
	*  	}
     **/

    //params : authtoken,meetingId
    app.post(`${baseUrl}/getMeetingByMeetingId`,auth.isAuthorized, meetingController.getAllMeetingByMeetingId);
    /**
	* @api {post} /api/v1/meeting/getMeetingByMeetingId Get Meeting
	* @apiVersion 0.0.1
    * @apiGroup  Meeting
    
    * @apiParam {string} autToken Token generated from Login. 
	* @apiParam {string} meetingId 
	*
	  @apiSuccessExample {json} Success-Response:
	*  {
	*   "error": false,
	*   "message": "Meeting Found.",
	*   "status": 200,
	*   "data": [
    *				{
    *					Information about the meeting
    *				}
	*   		]
	*  	}
     **/


    // params:authTOken, adminId, meetingId
    app.post(`${baseUrl}/deleteMeeting`,auth.isAuthorized, meetingController.deleteMeeting);
    /**
	* @api {post} /api/v1/meeting/deleteMeeting Delete Meeting
	* @apiVersion 0.0.1
    * @apiGroup  Meeting
    
    * @apiParam {string} autToken Token generated from Login.  
    * @apiParam {string} meetingId 
	* @apiParam {string} adminName 
	* @apiParam {string} date 
	* @apiParam {string} time 
    * @apiParam {string} where 
	* @apiParam {string} purpose 
    * @apiParam {string} adminId  
    * @apiParam {string} userId 
	*
	  @apiSuccessExample {json} Success-Response:
	*  {
	*   "error": false,
	*   "message": "Meeting Deleted.",
	*   "status": 200,
	*   "data": [
    *				{
    *					Information about the meeting
    *				}
	*   		]
	*  	}
     **/

    // params:authTOken, adminId, meetingId
    app.post(`${baseUrl}/updateMeeting`,auth.isAuthorized, meetingController.updateMeeting);
    /**
	* @api {post} /api/v1/meeting/updateMeeting Update  Meeting
	* @apiVersion 0.0.1
	* @apiGroup  Meeting
    *
    * @apiParam {string} autToken Token generated from Login. 
    * @apiParam {string} meetingId 
	* @apiParam {string} adminName 
	* @apiParam {string} date 
	* @apiParam {string} time 
    * @apiParam {string} where 
	* @apiParam {string} purpose 
    * @apiParam {string} adminId  
    * @apiParam {string} userId 
	*
	  @apiSuccessExample {json} Success-Response:
	*  {
	*  "error": false,
            "message": "Meeting Updated"
            "status": 200,
            "data": {
                nOk: number,
                modified : 1
            }

	*  	}
     **/


    // params: authTOken,adminId,userId,adminName,username,year,month,date,time,where,purpose
    app.post(`${baseUrl}/addMeeting`,auth.isAuthorized, meetingController.addMeeting);
    /**
	* @api {post} /api/v1/meeting/addMeeting Create New  Meeting
	* @apiVersion 0.0.1
	* @apiGroup  Meeting
    *
   * @apiParam {string} autToken Token generated from Login. 
	* @apiParam {string} adminName 
	* @apiParam {string} date 
	* @apiParam {string} time 
    * @apiParam {string} where 
	* @apiParam {string} purpose 
    * @apiParam {string} adminId  
    * @apiParam {string} userId 
	*
	  @apiSuccessExample {json} Success-Response:
	*  {
	*   "error": false,
	*   "message": "Meeting Created.",
	*   "status": 200,
	*   "data": [
    *				{
    *					Information about the meeting
    *				}
	*   		]
	*  	}
     **/



    //------ cart based routes
    // params: cartId( if not there make new cart and then add items)
    //,itemId,itemName,itenDescription,itemCost
   // app.post(`${baseUrl}/addItemToCart`, meetingController.addMeeting);

    // params: cartId,itemId
   // app.post(`${baseUrl}/deleteItemFromCart`, meetingController.addMeeting);

    // params: cartId
   // app.post(`${baseUrl}/getAllItemsFromCart`, meetingController.addMeeting);

    // params: nothing required
   // app.post(`${baseUrl}/getAllItems`, meetingController.addMeeting);

    // params: itemId,itemName,itemDescription,itemCost
  //  app.post(`${baseUrl}/addItemToDb`, meetingController.addMeeting);

}

