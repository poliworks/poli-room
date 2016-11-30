package models

import play.api.libs.json.{Format, Json, Writes}
import scalikejdbc._
import traits.DatabaseModel

case class Room(name: String, building: String, department: String, size: Int, id: Long = 0L) {

}

object Room extends DatabaseModel[Room]("rooms") {

  implicit val writes: Writes[Room] = Json.writes[Room]

  override def apply(rn: scalikejdbc.ResultName[Room])(rs: WrappedResultSet): Room = Room(
    rs.get(rn.name), rs.get(rn.building), rs.get(rn.department), rs.get(rn.size), rs.get(rn.id))


  override def apply(rs: WrappedResultSet): Room = Room(
    rs.string("name"), rs.string("building"), rs.string("department"), rs.int("size"), rs.long("id"))

}
