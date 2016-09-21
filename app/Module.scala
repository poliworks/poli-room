import com.google.inject.AbstractModule
import traits.IDiscovery
import components.Discovery

class Module extends AbstractModule {

  override def configure() = {
    bind(classOf[IDiscovery]).to(classOf[Discovery]).asEagerSingleton()
  }

}
