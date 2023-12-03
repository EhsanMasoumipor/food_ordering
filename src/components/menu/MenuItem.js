export default function MenuItem () {
    return(
        <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-lg'>
            <div className="text-center ">
               <img className="max-w-20 max-h-24 block mx-auto" src='/pizza.png' />
            </div>
            <h4 className='font-semibold my-2 '>Pepperoni pizza </h4>
             <p>the missing piece that makes every day complete</p>
            <button className='bg-primary text-white rounded-full px-8 py-2 mt-4'>add to card $12</button>
        </div>
    )
}