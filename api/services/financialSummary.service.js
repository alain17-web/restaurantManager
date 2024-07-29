const createConnection = require('../database/database');


const financialSummaryService = {
    //CREATE
    addFinancialSummary: async ({
                                    income,
                                    income_date,
                                    comments,
                                    spendings,
                                    spending_date,
                                    remarks,
                                    total_on_hand,
                                    profits
                                }) => {
        const connection = await createConnection();
        try {
            const [summary] = await connection.execute(
                'INSERT INTO finances (income,income_date,comments,spendings,spending_date,remarks,total_on_hand,profits) VALUES (?,?,?,?,?,?,?,?)',
                [income, income_date, comments, spendings, spending_date, remarks, total_on_hand, profits])
            return {
                id: summary.insertId,
                income,
                income_date,
                comments,
                spendings,
                spending_date,
                remarks,
                total_on_hand,
                profits
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
        income,
        income_date,
        comments,
        spendings,
        spending_date,
        remarks,
        total_on_hand,
        profits) => {
        const connection = await createConnection();

        try {
            const [updatedSummary] = await connection.execute('UPDATE finances SET income = ?,income_date = ?,comments = ?,spendings = ?,spending_date = ?,remarks = ?,total_on_hand = ?,profits = ? WHERE id = ?',[
                income,
                income_date,
                comments,
                spendings,
                spending_date,
                remarks,
                total_on_hand,
                profits,
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