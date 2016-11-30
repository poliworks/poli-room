package models.dao

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

}
