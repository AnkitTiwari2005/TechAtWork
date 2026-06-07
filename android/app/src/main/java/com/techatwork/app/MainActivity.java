package com.techatwork.app;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onBackPressed() {
        // Let Capacitor handle back button via JS bridge
    }
}
