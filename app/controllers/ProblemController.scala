package controllers

import javax.inject.Inject

import models.dao.ProblemDao
import play.api.mvc.{Action, Controller}
import scalikejdbc._
import traits.{ITokenService, Interceptors}

/**
  * Created by leoiacovini on 12/1/16.
  */
class ProblemController @Inject()(tokenService: ITokenService) extends Controller with Interceptors {

  def removeProblem(problemId: Long) = AuthAction(tokenService)(null) {
    DB localTx { implicit session => new ProblemDao().removeProblem(problemId) }
    Ok
  }

}
