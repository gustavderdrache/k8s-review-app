# Review app example

Creates review apps. Tested with [minikube](https://kubernetes.io/docs/tutorials/hello-minikube/).

# Starting the cluster

```bash
minikube start
minikube addon enable ingress
minikube addon enable registry
kubectl --namespace=kube-system port-forward service/registry 80:5000
```

If you want to poke around in the dashboard:

```bash
minikube addon enable dashboard
minikube dashboard
```

# Deploying `master`

In one terminal:

```bash
cd example-app
eval "$(minikube docker-env)"
docker build -t localhost:5000/example:master .
docker push localhost:5000/example:master
```

In another terminal:

```bash
cd review-app
npm ci
node . example master
```

# Deploying another branch

In one terminal:

```bash
cd example-app
# ... after making changes to index.html ...
eval "$(minikube docker-env)"
docker build -t localhost:5000/example:some-feature .
docker push localhost:5000/example:some-feature
```

In another terminal:

```bash
cd review-app
node . example some-feature
```

# Verifying

If the above instructions have gone well, you should have a pair of ingresses created for minikube:

```bash
$ kubectl --namespace=review get ingress
NAME                   HOSTS                             ADDRESS           PORTS   AGE
example-master         master.example.review.app         192.168.122.141   80      93s
example-some-feature   some-feature.example.review.app   192.168.122.141   80      91s
```

You can verify that the apps are running side-by-side by `curl`ing the ingress IP and overriding the host:

```
$ curl -H 'Host: master.example.review.app' http://192.168.122.141/
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Example Application</title>
  </head>
  <body>
    <p>This is the example app running on <code>master</code>.</p>
  </body>
</html>
```

```
$ curl -H 'Host: some-feature.example.review.app' http://192.168.122.141/
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Example Application</title>
  </head>
  <body>
    <p>This is the example app running on a <em>review branch!</em></p>
  </body>
</html>
```

Cleaning up
===========

Objects are tagged with `repo`, `branch`, and `tag` metadata. (`repo` and `branch` are forced lowercase due to Kubernetes naming restrictions.)

```bash
# To delete a single review app:
kubectl delete svc,deployments,ingress -l app=example-some-feature

# To blow away an entire repo's apps:
kubectl delete svc,deployments,ingress -l repo=example
```