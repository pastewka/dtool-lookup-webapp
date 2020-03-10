Provisining a lookup webapp server
----------------------------------

- Go into the dtool-lookup-webapp directory::

        cd ../dtool-lookup-webapp

- Build the Vue project in dtool-lookup-webapp using::

        npm run build

- Move the build into provision::

         mv dist/ ../provision/roles/dtool_lookup_webapp/files/dtool_lookup_webapp

- Go into the provision/roles/dtool_lookup_webapp/files directory::

        cd ../provision/roles/dtool_lookup_webapp/files

- Create a tarball::

         tar -zcvf dtool_lookup_webapp.tar.gz dtool_lookup_webapp/

- Go into the provision directory::

        cd ../../../

- Run anisble::

        ansible-playbook -i hosts playbook.yml

- Log into the dtool-lookup-webapp and restart nginx
