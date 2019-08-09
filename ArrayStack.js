var Stack = (function(){
    class Stack{
        constructor() {
            this.top = -1;     // index of top element
            this.stack = [];   // array representing stack
        }

        /**把資料放進Stack */
        Push(data) {
            stack[++top] = data;
        }

        /**把「最上面」的資料從Stack中移除 */
        Pop(){
            if(IsEmpty()){
                //exception 無資料可 Pop
                return;
            }

            this.top --;
        }

        /**回傳「最上面」的資料，不影響資料結構本身 */
        Top(){
            if(IsEmpty()){
                //Exception 無資料可 Top
                return;
            }

            return stack[top];
        }

        /**確認Stack裡是否有資料，不影響資料結構本身。 */
        IsEmpty(){
            return (this.top == -1);
        }

        /**回傳Stack裡的資料個數，不影響資料結構本身 */
        getSize(){
            return (this.top + 1);
        }
    } 
})();