/**
 * dateList {
    date: new Date("2000-01-10").toLocaleDateString(),
    id: "2",
  }[]
 * detailList {
    2: {
       id: Date.now() + 1000,
       createAt: new Date(),
       description: "삼겹살",
       category: "식사",
       amount: 20000,
       fundsAtTheTime: 9978000,
     }[]
  }
 */
export const store = {
  currentFunds: 0,

  isFirstEdit: true,
  todayId: 1,

  dateList: [
    {
      id: 1,
      date: new Date().toLocaleDateString(),
    },
  ],
  detailList: {},
};

export function updateStorage() {
  sessionStorage.setItem("store", JSON.stringify(store));
}

export function initStore() {
  const storage = sessionStorage.getItem("store");
  if (!storage) updateStorage();

  const { dateList, detailList, todayId, currentFunds, isFirstEdit } =
    JSON.parse(storage);

  store.currentFunds = currentFunds;
  store.isFirstEdit = isFirstEdit;
  store.dateList = dateList;
  store.detailList = detailList;
  store.todayId = todayId;
}

export function addNewHistory(newHistory) {
  try {
    // TODO:
    /**
     * - store의 detailList 새로 갱신
     * - store.currentFunds 새로 갱신
     */
    if(store.detailList[store.todayId]){
        store.detailList[store.todayId].push(newHistory);
    }else{
      store.detailList[store.todayId]=[newHistory];

    }
    //현재자산-amount
    store.currentFunds -= newHistory.amount;

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

export function removeHistory(dateId, itemId) {
  try {
    // TODO:
    /**
     * - store의 detailList 새로 갱신
     * - store.currentFunds 새로 갱신
     */
    //기존 배열->삭제할 요소를 제거한 배열->재할당
    //store.detailList[dateId] = null;
    
    store.detailList[dateId] = store.detailList[dateId].filter(({ id, amount }) => {
      if(id===Number(itemId)){
        store.currentFunds += amount;
      }
      return id !== Number(itemId);
    });

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}
