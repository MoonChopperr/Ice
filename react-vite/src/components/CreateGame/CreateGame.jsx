import GameForm from "../GameForm/GameForm"

const CreateGame = () => {
    const buttonName = 'Create Game'

    return (
        <>
            <div>
                <GameForm buttonName={buttonName} />
            </div>
        </>
    )
}

export default CreateGame
