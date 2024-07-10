import CardHome from "@/components/card-home";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className='flex flex-col md:flex-row justify-center items-center md:space-x-4 space-y-4 md:space-y-0 p-6 gap-28'>
            <CardHome title={'TASKS'} router={'/tasks'} routerImage={'/images/task.png'} buttonText={'go to'}/>
            <CardHome title={'TEAMS'} router={'/users'} routerImage={'/images/teams.png'} buttonText={'go to'}/>
        </div>
    </main>
  );
}
