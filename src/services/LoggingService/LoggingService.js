const LoggingService = {

    /**
     * TODO: to actually log errors to somewhere
     * @param {object} e - the error to be logged
     * @returns {void}
     */
    error: (e) => {

        console.error('Just pretending I\'m logging this somewhere: ', e);
        return {
            error: 'apperror',
            message: e,
        }

    }

}

export default LoggingService;