package models

import play.api.libs.json.{Format, Json}
import scalikejdbc.WrappedResultSet
import traits.DatabaseModel

/**
  * Created by leoiacovini on 11/30/16.
  */
case class Feature(name: String, description: String, quantity: Int, cssIconId: Int, id: Long = 0L) {

}

object Feature extends DatabaseModel[Feature]("features") {

  implicit val format: Format[Feature] = Json.format[Feature]

  def apply(rn: scalikejdbc.ResultName[Feature])(rs: WrappedResultSet): Feature = Feature(
    rs.get(rn.name), rs.get(rn.description), rs.get(rn.quantity), rs.get(rn.cssIconId), rs.get(rn.id))

  def apply(rs: WrappedResultSet): Feature = Feature(
    rs.string("name"), rs.string("description"), rs.int("quantity"), rs.int("css_icon_id"), rs.long("id"))

}
