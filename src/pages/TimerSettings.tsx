export const TimerSettings = () => {

    return (
        <> 
        <div>
            <main>
                <h1>Timer settings</h1>
                <div>
                    <button>Classic Pomodoro</button>
                    <button>Last settings</button>
                    <button>Customize timer</button>
                </div>
                <div>
                    <label> Work interval (minutes)
                        <input/>
                    </label>
                    <label> Break interval (minutes)
                        <input/>
                    </label>
                    <label> Number of sets
                        <input/>
                    </label>
                </div>

                <div>
                    <button>Go back</button>
                    <button>Start timer</button>
                </div>
                
            </main>
        </div>
        </>
    )
}