package components

import javax.inject.Inject

import play.api.Configuration
import traits.IDiscovery

class Discovery @Inject()(config: Configuration) extends IDiscovery {

  def getServiceUrl(serviceName: String): String = {
    config.getString(serviceName).get
  }

  private val routes: Map[String, RouteEntry] = {
    val routesConfig = config.getConfig("routes").get
    routesConfig.subKeys.foldLeft(Map[String, RouteEntry]()) { (acc, key) =>
      acc ++ Map(key ->
        { val service = routesConfig.getString(s"$key.service").get
          Map("url" -> (getServiceUrl(service) + routesConfig.getString(s"$key.url").get),
              "service" -> service,
              "method" -> routesConfig.getString(s"$key.method").get)})
    }
  }

  def routesFor(accessor: String): Map[String, RouteEntry] = {
    routes
  }

  def getRoute(routeName: String, replaceMap: Map[String, String] = Map()): String = {
    renderUrl(routes(routeName)("url"), replaceMap)
  }

  def renderUrl(url: String, replaceMap: Map[String, String]): String = {
    replaceMap.foldLeft(url) { (acc, replacePair) => acc.replaceAll(s":${replacePair._1}", replacePair._2) }
  }
}
