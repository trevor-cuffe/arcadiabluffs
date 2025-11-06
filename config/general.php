<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\config\GeneralConfig;
use craft\helpers\App;

$isDev = App::env('CRAFT_ENVIRONMENT') === 'dev';
$isProd = App::env('CRAFT_ENVIRONMENT') === 'production';
$allowAdmin = ($isDev or App::env('CRAFT_ALLOW_ADMIN_CHANGES') == 'true');

return GeneralConfig::create()
    // Set the default week start day for date pickers (0 = Sunday, 1 = Monday, etc.)
    ->defaultWeekStartDay(1)
    // Prevent generated URLs from including "index.php"
    ->omitScriptNameInUrls()
    ->cpTrigger(App::env('CP_TRIGGER') ?: 'admin')

    // The secure key Craft will use for hashing and encrypting data
    ->securityKey(App::env('CRAFT_SECURITY_KEY'))
    // Enable Dev Mode on the dev environment (see https://craftcms.com/guides/what-dev-mode-does)
    ->devMode($isDev)
    // Only allow administrative changes on the dev environment
    ->allowAdminChanges($allowAdmin)
    // Disallow robots everywhere except the production environment
    ->disallowRobots(!$isProd)
    ->resourceBasePath(dirname(__DIR__) . '/web/cpresources')

    // disable template caching if in dev environment
    ->enableTemplateCaching(!$isDev)
    
    // craft security configuration
    ->sendPoweredByHeader(false)

    // template caching
    ->enableTemplateCaching(!$isDev)



    // copied from craft 2 project
    ->defaultSearchTermOptions([
      'subLeft' => true,
      'subRight' => true,
    ])
    ->pageTrigger('page/')
    ->defaultImageQuality(85)
    ->maxUploadFileSize(33554432)

;
