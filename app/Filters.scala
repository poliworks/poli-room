import javax.inject._
import play.api._
import play.api.http.HttpFilters
import play.api.mvc._

import filters.LoggingFilter

@Singleton
class Filters @Inject() (env: Environment, loggingFilter: LoggingFilter) extends HttpFilters {

  override val filters = {
    Seq(loggingFilter)
  }

}
