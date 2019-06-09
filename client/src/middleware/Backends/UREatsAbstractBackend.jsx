export default class UREatsAbstractBackend{
  _post(url: string, body: Object | FormData, params: Object): Promise {
    return new Promise((resolve, reject) => {
      fetch(url, {
        ...{
          method: "POST",
          body: body
        },
        ...params
      })
        .then(response => {
          if (response.ok === true) {
            return response.json().then(json => resolve(json));
          } else {
            resolve({ error: true });
          }
        })
        .catch(error => reject(error));
    });
  }

  _put(url: string, body: Object, params: Object, ): Promise {
    return new Promise((resolve, reject) => {
      fetch(url, {
          ...{
            method: "PUT",
            body: body,
          },
          ...params
        })
        .then(response => {
          return response.json().then(json => {
            resolve(json);
          });
        })
        .catch(error => reject(error));
    });
  }

  _get(url: string, params: Object): Promise {
    return new Promise((resolve, reject) => {
      fetch(url, { method: "GET"}, params)
        .then(response => {
          console.log(response);
          return response.json().then(json => {
            resolve(json);
          });
        })
        .catch(error => reject(error));
    });
  }

  _delete(url: string, params: Object): Promise {
    return new Promise((resolve, reject) => {
      fetch(url, {
          ...{
            method: "DELETE",
          },
          ...params
        })
        .then(response => {
          return response.json().then(json => {
            resolve(json);
          });
        })
        .catch(error => reject(error));
    });
  }

  static objToFormData(obj: Object): FormData {
    const fd = new FormData();
    const formatFormData = (obj: Object, rootKey: undefined | string) => {
      for (let key in obj) {
        let newKey = (rootKey !== undefined) ? rootKey + '__' + key : key;
        if (obj[key] !== null && obj[key].constructor === Object) {
          formatFormData(obj[key], newKey);
        } else {
          fd.append(newKey, obj[key]);
        }
      }
    }
    formatFormData(obj);
    return fd;
  }

}
