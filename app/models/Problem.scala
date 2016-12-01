package models

import org.joda.time.DateTime
import play.api.libs.json.{Json, Writes}
import scalikejdbc.WrappedResultSet
import traits.DatabaseModel

/**
  * Created by leoiacovini on 12/1/16.
  */
case class Problem(name: String, description: String, reportedBy: Long, reportedAt: DateTime, featureId: Long, roomId: Long, id: Long) {

}

object Problem extends DatabaseModel[Problem]("problems") {

  implicit val jodaWrites: Writes[DateTime] = Writes.jodaDateWrites("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
  implicit val format = Json.format[Problem]

  override def apply(rn: scalikejdbc.ResultName[Problem])(rs: WrappedResultSet): Problem = Problem(
    rs.get(rn.name), rs.get(rn.description), rs.get(rn.reportedBy), rs.get(rn.reportedAt), rs.get(rn.featureId), rs.get(rn.roomId), rs.get(rn.id))

  override def apply(rs: WrappedResultSet): Problem = Problem(
    rs.string("name"), rs.string("description"), rs.long("reported_by"), rs.jodaDateTime("reported_at"), rs.long("feature_id"), rs.long("room_id"), rs.long("id"))
}
