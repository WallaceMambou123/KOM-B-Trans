package com.kom_b_trans

import android.os.Bundle // Ajout de l'import pour Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen // 💡 Importation de la bibliothèque

class MainActivity : ReactActivity() {

  // 💡 Ajout de la méthode onCreate pour afficher le splash screen
  override fun onCreate(savedInstanceState: Bundle?) {
    // Afficher le splash screen
    SplashScreen.show(this)
    super.onCreate(savedInstanceState)
  }

  /**
   * Returns the name of the main component registered from JavaScript...
   */
  override fun getMainComponentName(): String = "KOM_B_Trans"

  /**
   * Returns the instance of the [ReactActivityDelegate]...
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}