package com.techatwork.app;

import android.os.Bundle;
import androidx.core.view.WindowCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Prevent edge-to-edge rendering — system bars stay visible
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);
    }

    @Override
    public void onBackPressed() {
        // Let Capacitor handle back button via JS bridge
    }
}
