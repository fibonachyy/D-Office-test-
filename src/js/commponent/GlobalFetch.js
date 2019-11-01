export default class MainFetch {

    static post = (url, body = {}, headers = {}, onSuccess, onErr) => {
        try {
            const option = {
                method: 'post',
                headers: headers,
                body: JSON.stringify(body)

            };
            inneralFetch(url, option, onSuccess, onErr)
        } catch (e) {
            onErr(e)
        }


    }
    static get = (url, headers = {}, onSuccess, onErr) => {
        try {
            const option = {
                method: 'get',
                headers: headers
            };
            inneralFetch(url, option, onSuccess, onErr)
        } catch (e) {
            onErr(e)
        }
    }
    static fetch = (url, option, onSuccess, onErr) => {
        inneralFetch(url, option, onSuccess, onErr)
    }

    static rawResponseHandler = (response) => {
        if (!response.ok) {
            return response.text().then(text => {
                throw JSON.parse(text)
            })
        }
        else {
            try {
                return correctResponseHandler(response)
            }
            catch (e) {
                throw e
            }
        }
    }
}

const inneralFetch = (url, option, onSuccess, onErr) => {
    fetch(url, option)
        .then(response => {
            try {
                return MainFetch.rawResponseHandler(response)
            }
            catch (e) {
                throw e
            }
        })
        .then(data => {
            onSuccess(data)
        })
        .catch(err => {
            onErr(err)
        })
}
const correctResponseHandler = (response) => {
    try {
        return response.json()
    } catch (e) {
        throw response
    }
}