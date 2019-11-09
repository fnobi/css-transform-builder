css-transform-builder
----

## setup build, test and release automation with circleci

* generate key

```bash
$ ssh-keygen -m pem -C 'circleci' -f ci.css-transform-builder.id_rsa
```

* paste public key in github `Settings / Deploy keys`
* paste fingerprint in `.circleci/config.yml`
* commit and push with `.circleci/config.yml`
* duplicate branch with name `master-build` and push.
* `Add Project` in circleci admin
* paste private key in circleci `SSH Permissions`
* add npm user token to circleci environment
* add npm release workflow

```yaml
- npm_release:
    filters:
      tags:
        only: /^v.*/
      branches:
        ignore: /.*/
```