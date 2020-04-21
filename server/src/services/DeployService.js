
class DeployService {

    async deploy(file) {
        try {
            const firmware = await {
                filename: file.filename,
                path: file.path,
                size: file.size,
            };
            return { status: 200, firmware };
        } catch (error) {
            throw { status: error.status || code.HTTP_INTERNAL_ERROR, message: error.message };
        }
    }

}

module.exports = new DeployService();