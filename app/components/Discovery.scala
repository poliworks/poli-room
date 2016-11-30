package components

import javax.inject.Inject

import play.api.Configuration
import traits.IDiscovery

class Discovery @Inject()(config: Configuration) extends IDiscovery {

  val host: String = config.getString("host").get

  private val routes: Map[String, RouteEntry] = {
    val routesConfig = config.getConfig("routes").get
    routesConfig.subKeys.foldLeft(Map[String, RouteEntry]()) { (acc, key) =>
      acc ++ Map(key ->
        Map("url" -> (host + routesConfig.getString(s"$key.url").get),
            "accessor" -> routesConfig.getString(s"$key.accessor").get,
            "method" -> routesConfig.getString(s"$key.method").get))
    }
  }

  def routesFor(accessor: String): Map[String, RouteEntry] = {
    routes.filter(m => m._2("accessor") == accessor || m._2("accessor") == "any")//.map(m => m._1 -> m._2)
  }

  def getRoute(routeName: String, replaceMap: Map[String, String] = Map()): String = {
    renderUrl(routes(routeName)("url"), replaceMap)
  }

  def renderUrl(url: String, replaceMap: Map[String, String]): String = {
    replaceMap.foldLeft(url) { (acc, replacePair) => acc.replaceAll(s":${replacePair._1}", replacePair._2) }
  }
}
