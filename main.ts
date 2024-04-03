import app from './app'

function main() {
    try {
        app.listen(3000, 'localhost', () => {
            console.log("Server running at port 3000")
        })
    } catch (error) { 
        
    }
}

main()