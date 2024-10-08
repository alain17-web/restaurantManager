//See comments on booking.service to understand this file called in controller
const createConnection = require('../database/database');


const financialSummaryService = {
    //CREATE
    addFinancialSummary: async ({
                                    total = null,
                                    order_date = null,
                                    order_id = null,
                                    comments = null,
                                    totalPurchase = null,
                                    purchase_date = null,
                                    purchase_id = null,
                                    remarks = null,
                                    total_on_hand,
                                }) => {
        const connection = await createConnection();
        try {
            const [summary] = await connection.execute(
                'INSERT INTO finances (total,order_date,order_id,comments,totalPurchase,purchase_date,purchase_id, remarks,total_on_hand) VALUES (?,?,?,?,?,?,?,?,?)',
                [total, order_date, order_id, comments, totalPurchase, purchase_date, purchase_id, remarks, total_on_hand])
            return {
                id: summary.insertId,
                total,
                order_date,
                order_id,
                comments,
                totalPurchase,
                purchase_date,
                purchase_id,
                remarks,
                total_on_hand,
            }
        } catch (error) {
            console.error('Error addFinancialSummary service', error);
            throw error;
        } finally {
            await connection.end()
        }
    },

    //READ
    getAllFinancialSummaries: async () => {
        const connection = await createConnection();

        try {
            const [summaries] = await connection.execute('SELECT * FROM finances ORDER BY id DESC')
            return summaries;
        } catch (error) {
            console.error('Error getAllFinancialSummaries service', error)
            throw error;
        } finally {
            await connection.end();
        }
    },

    getLastTotal_on_hand: async () => {
        const connection = await createConnection();
        try{
           const [total] = await connection.execute('SELECT total_on_hand FROM finances ORDER BY id DESC LIMIT 1')
            if(total.length > 0){
                return total[0].total_on_hand;
            } else {
                return 0
            }

        }catch(error){
            console.error('Error getLastTotal_on_hand service', error);
            throw error;
        }finally {
            await connection.end();
        }
    },

    //UPDATE
    updateFinancialSummary: async (
        id,
        total,
        order_date,
        order_id,
        comments,
        totalPurchase,
        purchase_date,
        purchase_id,
        remarks,
        total_on_hand
        ) => {
        const connection = await createConnection();

        try {
            const [updatedSummary] = await connection.execute('UPDATE finances SET total = ?,order_date = ?, order_id = ?,comments = ?,totalPurchase = ?,purchase_date = ?, purchase_id = ?, remarks = ?,total_on_hand = ? WHERE id = ?',[
                total,
                order_date,
                order_id,
                comments,
                totalPurchase,
                purchase_date,
                purchase_id,
                remarks,
                total_on_hand,
                id
            ])
            return updatedSummary.affectedRows > 0;
        } catch (error) {
            console.error('Error updateFinancialSummary service', error);
            throw error;
        } finally {
            await connection.end();
        }
    },


    //DELETE
    deleteFinancialSummary: async (id) => {
        const connection = await createConnection();
        try{
           const [deletedSummary] = await connection.execute('DELETE FROM finances WHERE id = ?', [id]);
           return deletedSummary.affectedRows > 0;
        }catch  (error){
            console.error('Error deleteFinancialSummary service', error);
            throw error;
        }finally {
            await connection.end();
        }
    }
}
module.exports = financialSummaryService;