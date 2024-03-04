dtool lookup webapp
===================

- GitHub: https://github.com/jic-dtool/dtool-lookup-webapp
- Free software: MIT License

Web application to query and display information about datasets stored in one
or more base URIs.

Dependencies
------------

This web application depends on having two other web services to talk to:

1. `dtool-lookup-server <https://github.com/jic-dtool/dtool-lookup-server>`_
2. `token-generator-ldap <https://github.com/jic-dtool/token-generator-ldap>`_

The first provides a means to search and display dataset metadata.
The latter provides a means to authenticate users.

Preamble
-------

::

    cd dtool-lookup-webapp


Create a file `.env` in the `dtool-lookup-webapp` directory with the following contents:

::

    VUE_APP_DTOOL_LOOKUP_SERVER_URL="http://localhost:5000"
    VUE_APP_DTOOL_LOOKUP_SERVER_TOKEN_GENERATOR_URL="http://localhost:5001/token"


For deployment, replace these URLs with the actual endpoints of the lookup server and the token generator.

If desired, customize the landing page by setting the following variables in the `.env` file:

::

   VUE_APP_FIRST_CONTAINER_TITLE=Log in
   VUE_APP_SECOND_CONTAINER_TITLE=dserver
   VUE_APP_SECOND_CONTAINER_MESSAGE=Welcome to <b>dserver</b>'s webapp.
   VUE_APP_THIRD_CONTAINER_HEADING=Access
   VUE_APP_THIRD_CONTAINER_MESSAGE=Some notes on how to gain access.
   VUE_APP_FOURTH_CONTAINER_HEADING=Docs
   VUE_APP_FOURTH_CONTAINER_INTRO=Some notes on how to find help. The following list may contain an arbitrary number of links.
   VUE_APP_FOURTH_CONTAINER_RESOURCES=[{"text": "dtool-lookup-webapp repsotiory", "url": "https://github.com/jic-dtool/dtool-lookup-webapp"}]
   VUE_APP_LANDING_PAGE_ICON_PATH=/path/to/custom/icon.png

To apply changes to this file, run::

    npm install


Start a development server
--------------------------

::

    cd dtool-lookup-webapp
    npm run serve


Compile into a static single page website
-----------------------------------------

::

    cd dtool-lookup-webapp
    npm run build


Fixing dependencies in broken install
-------------------------------------

Remove all npm environment-related, e.g.

::

    rm -rf remove dist/ node_modules/
    rm package-lock.json

reinstall

::

    npm install @vue/cli-service

and rebuild

::
    npm run build


Testing
-------

For testing, the config file 

::

    jest.config.js

is needed. This file has been auto-generated with

::

    vue add unit-jest

after installing the vue cli globally with

::

    npm install -g @vue/cli


More information
----------------

See dtool-lookup-webapp/README.md for more information about how to develop and build.
See provision/README.rst for instructions on how to deploy using Ansibl.e
