package models.dao

import misc.json.schemas.RegisterFeatureSchema
import models._
import scalikejdbc._

/**
  * Created by leoiacovini on 11/30/16.
  */
class FeatureDao {

  def getFeatureForRoom(roomId: Long)(implicit session: DBSession): List[Feature] = {
    sql"""SELECT f.* FROM features AS f
          LEFT JOIN rooms_features AS rf ON rf.features_id = f.id
          RIGHT JOIN rooms AS r ON rf.room_id = r.id
          WHERE r.id = ${roomId}""".map(Feature.apply).list.apply()
  }

  def registerNewFeature(reg: RegisterFeatureSchema, roomId: Long)(implicit session: DBSession): Feature = {
    val featureId = sql"""INSERT INTO features (name, description, img, quantity) VALUES (${reg.name}, ${reg.description}, ${reg.img}, ${reg.quantity})""".updateAndReturnGeneratedKey.apply()
    sql"""INSERT INTO rooms_features (room_id, features_id) VALUES (${roomId}, ${featureId})""".update.apply()
    new Feature(reg.name, reg.description, reg.quantity, reg.img, featureId)
  }

}
