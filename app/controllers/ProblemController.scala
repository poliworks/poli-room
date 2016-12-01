package controllers

import models.dao.ProblemDao
import play.api.mvc.{Action, Controller}
import scalikejdbc._

/**
  * Created by leoiacovini on 12/1/16.
  */
class ProblemController extends Controller {

  def removeProblem(problemId: Long) = Action {
    DB localTx { implicit session => new ProblemDao().removeProblem(problemId) }
    Ok
  }

}
