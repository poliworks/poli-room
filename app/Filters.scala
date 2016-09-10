import javax.inject._
import play.api._
import play.api.http.HttpFilters
import play.api.mvc._

import filters.LoggingFilter

@Singleton
class Filters @Inject() (env: Environment, exampleFilter: LoggingFilter) extends HttpFilters {

  override val filters = {

  }

}
