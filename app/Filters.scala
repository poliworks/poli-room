import javax.inject._

import play.api._
import play.api.http.HttpFilters
import play.api.mvc._
import filters.LoggingFilter
import play.filters.cors.CORSFilter

@Singleton
class Filters @Inject() (env: Environment, loggingFilter: LoggingFilter, corsFilter: CORSFilter) extends HttpFilters {

  override val filters = {
    Seq(loggingFilter, corsFilter)
  }

}
