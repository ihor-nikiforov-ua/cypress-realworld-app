import { isEmpty } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { getTransactionQueryParams } from "../utils/transactionUtils";
import { backendPort } from "../utils/portUtils";

export const contactsTransactionsMachine = dataMachine("contactsTransactions").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = getTransactionQueryParams(event);
      const resp = await httpClient.get(`http://localhost:${backendPort}/transactions/contacts`, {
        params: !isEmpty(payload) ? payload : undefined,
      });
      return resp.data;
    },
  },
});
