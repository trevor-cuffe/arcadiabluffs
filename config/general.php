<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\helpers\App;

$isDev = App::env('ENVIRONMENT') === 'dev';
$isProd = App::env('ENVIRONMENT') === 'production';
$allowAdmin = ($isDev or App::env('CRAFT_ALLOW_ADMIN_CHANGES') == 'true');

return [
    // Default Week Start Day (0 = Sunday, 1 = Monday...)
    'defaultWeekStartDay' => 1,

    // Whether generated URLs should omit "index.php"
    'omitScriptNameInUrls' => true,

    // The URI segment that tells Craft to load the control panel
    'cpTrigger' => App::env('CP_TRIGGER') ?: 'admin',

    // The secure key Craft will use for hashing and encrypting data
    'securityKey' => App::env('SECURITY_KEY'),

    // Whether Dev Mode should be enabled (see https://craftcms.com/guides/what-dev-mode-does)
    'devMode' => $isDev,

    // Whether administrative changes should be allowed
    'allowAdminChanges' => $allowAdmin,

    // disable template caching if in dev environment
    'enableTemplateCaching' => !$isDev,

    // Whether crawlers should be allowed to index pages and following links
    'disallowRobots' => !$isProd,

    'resourceBasePath' => (dirname(__DIR__) . '/web/cpresources'),



    // copied from craft 2 project
    'defaultSearchTermOptions' => array(
      'subLeft' => true,
      'subRight' => true,
    ),

    'pageTrigger' => 'page/',
    'defaultImageQuality' => 85,
    'maxUploadFileSize' => 33554432,
    'preserveImageColorProfiles' => true,


];
