package models.dao

import misc.json.schemas.RegisterProblemSchema
import models.Problem
import org.joda.time.DateTime
import scalikejdbc._

/**
  * Created by leoiacovini on 12/1/16.
  */
class ProblemDao {

  val p = Problem.syntax("p")

  def getProblemsByRoomId(roomId: Long)(implicit session: DBSession): List[Problem] = {
    sql"SELECT * FROM problems WHERE room_id = ${roomId}".map(Problem.apply).list.apply()
  }

  def createNewProblem(reg: RegisterProblemSchema): Problem = {
    val now = DateTime.now()
    val id = sql"""INSERT INTO problems (name, description, reported_by, reported_at, feature_id, room_id)
          VALUES (${reg.name}, ${reg.description}, ${reg.reportedBy}, ${now}, ${reg.featureId}, ${reg.roomId})""".updateAndReturnGeneratedKey().apply()
    new Problem(reg.name, reg.description, reg.reportedBy, now, reg.featureId, reg.roomId, id)
  }

}
