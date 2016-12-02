package controllers

import javax.inject.Inject

import misc.exceptions.{BadRequestException, NotFoundException}
import misc.json.schemas.{RegisterEventSchema, RegisterFeatureSchema, RegisterProblemSchema, RegisterRoomSchema}
import models.{Event, Feature, Problem, Room}
import models.dao.{EventDao, FeatureDao, ProblemDao, RoomDao}
import play.Configuration
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import scalikejdbc._
import traits.Interceptors
import play.api.libs.json.DefaultFormat


/**
  * Created by leoiacovini on 11/30/16.
  */
class RoomController @Inject()(configuration: Configuration) extends Controller with Interceptors {

  def getRooms(building: String) = Action {
    val rooms: List[Room] = DB readOnly { implicit session => new RoomDao().findAllFromBuilding(building) }
    val jsonRooms = Json.toJson(rooms)
    Ok(jsonRooms)
  }

  def registerRoom() = Action(schemaCoerce(RegisterRoomSchema)) { request =>
    val newRoom: RegisterRoomSchema = request.body
    val createdRoom = DB localTx { implicit session => new RoomDao().registerRoom(newRoom) }
    Ok(Json.toJson(createdRoom))
  }

  def getRoom(id: Long) = Action {
    val room: Room = DB readOnly { implicit session => new RoomDao().findById(id) } match {
      case Some(room: Room) => room
      case None => throw new NotFoundException("Room Not Found")
    }
    Ok(Json.toJson(room))
  }

  def getRoomsByBuilding() = Action {
    val allRooms = DB readOnly { implicit session => new RoomDao().allRoomsByBuilding }
    Ok(Json.toJson(allRooms))
  }

  def getRoomEvents(roomId: Long) = Action {
    val events: List[Event] = DB readOnly { implicit session =>
      new EventDao().getAllEventsForRoom(roomId)
    }
    Ok(Json.toJson(events))
  }

  def getRoomFeatures(roomId: Long) =  Action {
    val roomFeatures = DB readOnly { implicit session => new FeatureDao().getFeatureForRoom(roomId) }
    Ok(Json.toJson(roomFeatures))
  }

  def getRoomProblems(roomId: Long) = Action {
    val roomProblems: List[Problem] = DB readOnly { implicit session => new ProblemDao().getProblemsByRoomId(roomId) }
    Ok(Json.toJson(roomProblems))
  }

  def registerNewProblem(roomId: Long) = Action(schemaCoerce(RegisterProblemSchema)) { request =>
    val newProblem: Problem = DB localTx { implicit session => new ProblemDao().createNewProblem(request.body, roomId) }
    Ok(Json.toJson(newProblem))
  }

  def registerNewFeature(roomId: Long) = Action(schemaCoerce(RegisterFeatureSchema)) { request =>
    val newFeature: Feature = DB localTx { implicit session => new FeatureDao().registerNewFeature(request.body, roomId)}
    Ok(Json.toJson(newFeature))
  }

  def registerNewEvent(roomId: Long) = Action(schemaCoerce(RegisterEventSchema)) { request =>
    val newEvent = DB localTx { implicit session => new EventDao().registerNewEvent(request.body, roomId)}
    Ok(Json.toJson(newEvent))
  }

  def removeRoom(roomId: Long) = Action {
    DB localTx { implicit session => new RoomDao().removeRoom(roomId) }
    Ok
  }

  def getBuildings() = Action {
    val buildings: Array[String] = configuration.getStringList("buildings").toArray(Array[String]())
    Ok(Json.toJson(buildings))
  }

}
