package controllers

import misc.exceptions.{BadRequestException, NotFoundException}
import misc.json.schemas.RegisterRoomSchema
import models.{Event, Room}
import models.dao.{EventDao, RoomDao}
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import scalikejdbc._
import traits.Interceptors

/**
  * Created by leoiacovini on 11/30/16.
  */
class RoomController extends Controller with Interceptors {

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
      new EventDao().getAllEventsForRoom(1)
    }
    Ok(Json.toJson(events))
  }

}
