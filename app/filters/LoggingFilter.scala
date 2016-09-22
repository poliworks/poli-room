package filters

import akka.stream.Materializer
import javax.inject._

import play.api.Logger
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class LoggingFilter @Inject()(implicit override val mat: Materializer, exec: ExecutionContext) extends Filter {

  override def apply(nextFilter: RequestHeader => Future[Result])(requestHeader: RequestHeader): Future[Result] = {
    val logger = Logger.apply(this.getClass.toString)
    logger.info(requestHeader.toString())
    nextFilter(requestHeader)
  }

}
