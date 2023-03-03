

function processTasks(tasks){
    let running = false
    let taskRunning = false
    let i = 0
    let result = []
    return {
        async start(){
            //如果正在执行，不允许再start
            if(running||taskRunning) return
            //如果任务全部执行完了就直接返回结果
            if(i===tasks.length-1){
                return result
            }
            console.log("任务开始了")
            running = true
            taskRunning = true
            while(i<tasks.length){
                console.log("正在执行任务"+i)
                try {
                    var ret =  await tasks[i]()
                    result.push(ret)
                } catch (error) {
                    console.log('任务'+i+'出错了。。。')
                    running = false
                    return error
                }finally{
                    taskRunning = false
                }
                i++
                if(!running){
                    console.log("中断了。。。")
                    //中断
                    return result
                }
            }
            //任务结束
            console.log('任务结束')
            running = false
            return result
        },
        pause(){
            if(i==tasks.length-1) return
            running = false
        }
    }


}










    