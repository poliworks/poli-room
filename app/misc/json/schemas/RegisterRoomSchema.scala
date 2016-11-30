package misc.json.schemas

import models.Room
import play.api.libs.json.{JsValue, Json, Reads, Writes}
import traits.{JsonSchema, SchemaObject}

/**
  * Created by leoiacovini on 11/30/16.
  */
case class RegisterRoomSchema(name: String, building: String, department: String, size: Int) extends JsonSchema {
  override def toJson: JsValue = Json.toJson(this)

  def toRoom(id: Long) = new Room(name, building, department, size, id)
}

object RegisterRoomSchema extends SchemaObject[RegisterRoomSchema] {

  implicit val reads: Reads[RegisterRoomSchema] = Json.reads[RegisterRoomSchema]

  implicit val writes: Writes[RegisterRoomSchema] = Json.writes[RegisterRoomSchema]

}
