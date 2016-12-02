import javax.inject._
import misc.exceptions.HttpException
import play.api.http.DefaultHttpErrorHandler
import play.api._
import play.api.libs.json.Json
import play.api.mvc._
import play.api.mvc.Results._
import play.api.routing.Router

import scala.concurrent._

@Singleton
class ErrorHandler @Inject()(env: Environment,
                             config: Configuration,
                             sourceMapper: OptionalSourceMapper,
                             router: Provider[Router]) extends DefaultHttpErrorHandler(env, config, sourceMapper, router) {

  override def onServerError(request: RequestHeader, exception: Throwable): Future[Result] = {
    exception match {
      case e: HttpException => {
        Logger.error("HttpException", e)
        Future.successful(e.resultType)
      }
      case _ => super.onServerError(request, exception)
    }
  }

  override def onClientError(request: RequestHeader, statusCode: Int, message: String): Future[Result] = Future.successful {
    Status(statusCode)(Json.obj("message" -> messageForCode(statusCode, message)))
  }

  private def messageForCode(statusCode: Int, message: String): String = {
    statusCode match {
      case 404 => "Not Found" + message
      case 403 => "Forbidden" + message
      case 400 => "Bad Request" +  message
      case _ => message
    }
  }

}
