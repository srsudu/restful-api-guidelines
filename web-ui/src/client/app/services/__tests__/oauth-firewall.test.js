/* global global */

describe('oauth-firewall', () => {
  let OAuthProviderMock, mockCheckTokenIsValid, firewall;
  beforeEach(() => {
    jest.resetModules();
    mockCheckTokenIsValid = jest.fn();
    jest.mock('../oauth-provider');
    jest.mock('../oauth-util', () => ({
      checkTokenIsValid: mockCheckTokenIsValid
    }));
    global.window = {
      env: {},
      location: {
        hash: ''
      }
    };
    firewall = require('../oauth-firewall').default;
    OAuthProviderMock = require('../oauth-provider').default;
  });

  afterEach(() => {
    delete global.window;
  });

  test('return immediately with a resolved promise if oauth is disabled', (done) => {
    global.window.env.OAUTH_ENABLED = false;
    firewall()
      .then(() => {
        expect(mockCheckTokenIsValid).not.toHaveBeenCalled();
        done();
      });
  });

  test('return a rejected promise if OAuthProvider doesn\'t have an access token', (done) => {
    global.window.env.OAUTH_ENABLED = true;

    firewall()
      .catch(() => {
        done();
      });
  });

  test('parse implicit grant flow response and resolve', () => {
    const parseResponse = {};
    const tokenInfoResponse = {};
    global.window.env.OAUTH_ENABLED = true;
    global.window.location.hash = '#access_token=foo';
    global.window.location.href = 'https://www.google.com#access_token=foo';
    OAuthProviderMock._response = parseResponse;
    mockCheckTokenIsValid.mockReturnValueOnce(Promise.resolve(tokenInfoResponse));

    return firewall()
      .then((response) => {
        expect(mockCheckTokenIsValid).toHaveBeenCalled();
        expect(response).toEqual(tokenInfoResponse);
      });
  });

  test('parse implicit grant flow response and reject if something went wrong', (done) => {
    global.window.env.OAUTH_ENABLED = true;
    global.window.location.hash = '#access_token=foo';
    const parseError = new Error();
    OAuthProviderMock.parse = () => {
      throw parseError;
    };
    firewall()
      .catch((error) => {
        try {
          expect(error).toEqual(parseError);
          done();
        } catch (e) {
          done.fail(e);
        }

      });
  });

  test('parse implicit grant flow response and reject if response it\'s an error', (done) => {
    const parseResponse = new Error('OAuthError');
    global.window.env.OAUTH_ENABLED = true;
    global.window.location.hash = '#access_token=foo';
    global.window.location.href = 'https://www.google.com#access_token=foo';
    OAuthProviderMock._response = parseResponse;

    firewall()
      .catch((error) => {
        expect(global.window.location.href).toEqual('https://www.google.com#access_token=foo');
        expect(error).toEqual(parseResponse);
        done();
      });
  });

  test('check token is valid if OAuthProvider has an access token', (done) => {
    mockCheckTokenIsValid.mockReturnValueOnce(Promise.resolve('valid'));
    global.window.env.OAUTH_ENABLED = true;
    OAuthProviderMock._accessToken = 'foo';

    firewall()
      .then((response) => {
        expect(mockCheckTokenIsValid).toHaveBeenCalled();
        expect(response).toEqual('valid');
        done();
      });
  });

  test('if OAuthProvider check token is valid and reject if not valid', (done) => {
    const error = new Error();
    mockCheckTokenIsValid.mockReturnValueOnce(Promise.reject(error));
    global.window.env.OAUTH_ENABLED = true;
    OAuthProviderMock._accessToken = 'foo';

    firewall()
      .catch((response) => {
        try {
          expect(response).toEqual(error);
          expect(mockCheckTokenIsValid).toHaveBeenCalled();
          done();
        } catch (e) {
          done.fail(e);
        }
      });
  });

});