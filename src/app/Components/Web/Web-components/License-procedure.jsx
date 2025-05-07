
export default function LicenseProcess() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="badge badge-md badge-primary flex items-center justify-center m-auto font-semibold rounded-full text-primary-content">
        THE PROCESS
      </div>
      <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mt-5 mb-3">Driver's license process</h2>
      <p className="text-center text-gray-600 mb-8 md:mb-12">How to get your license</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
        {/* Step 1 */}
        <div className="border-r-0 flex flex-col gap-4 p-6 md:p-10 sm:border-r-1 border-b md:border-r-1 lg:border-r-1 border-base-300 ">
          <div className="top-sec flex items-center justify-between">
            <div className="bg-orange-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold">1</span>
            </div>
            <div className="top-title">
              <h3 className="font-medium text-xl md:text-2xl mb-2">Step 1</h3>
            </div>
          </div>
          <div>
            <p className="text-base-content/85 max-w-[300px]">Complete the driver's license application form</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="lg:border-r-1 md:border-r-0 flex flex-col gap-4 p-6 md:p-10 border-b sm:border-r-0 border-base-300 ">
          <div className="top-sec flex items-center justify-between">
            <div className="bg-orange-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold">2</span>
            </div>
            <div className="top-title">
              <h3 className="font-medium text-xl md:text-2xl mb-2">Step 2</h3>
            </div>
          </div>
          <div>
            <p className="text-base-content/85 max-w-[300px]">Complete the driver's license application form</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="sm:border-r-1 md:border-r flex flex-col gap-4 p-6 md:p-10 border-b lg:border-r-0 border-base-300 ">
          <div className="top-sec flex items-center justify-between">
            <div className="bg-orange-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold">3</span>
            </div>
            <div className="top-title">
              <h3 className="font-medium text-xl md:text-2xl mb-2">Step 3</h3>
            </div>
          </div>
          <div>
            <p className="text-base-content/85 max-w-[300px]">Complete the driver's license application form</p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="md:border-r-0 md:border-b flex flex-col gap-4 p-6 md:p-10 lg:border-b-0 lg:border-r-1 border-b sm:border-b-1 sm:border-r-0 lg-border-r-1 border-r-0 border-base-300 ">
          <div className="top-sec flex items-center justify-between">
            <div className="bg-orange-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold">4</span>
            </div>
            <div className="top-title">
              <h3 className="font-medium text-xl md:text-2xl mb-2">Step 4</h3>
            </div>
          </div>
          <div>
            <p className="text-base-content/85 max-w-[300px]">Complete the driver's license application form</p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex flex-col gap-4 p-6 md:p-10 sm:border-b-0 lg-border-r-1 lg:border-b-0 border-b-1 md:border-r-1 border-r-0 border-base-300 ">
          <div className="top-sec flex items-center justify-between">
            <div className="bg-orange-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold">5</span>
            </div>
            <div className="top-title">
              <h3 className="font-medium text-xl md:text-2xl mb-2">Step 5</h3>
            </div>
          </div>
          <div>
            <p className="text-base-content/85 max-w-[300px]">Complete the driver's license application form</p>
          </div>
        </div>

        {/* Step 6 */}
        <div className="flex flex-col gap-4 p-6 md:p-10 ">
          <div className="top-sec flex items-center justify-between">
            <div className="bg-orange-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold">6</span>
            </div>
            <div className="top-title">
              <h3 className="font-medium text-xl md:text-2xl mb-2">Step 6</h3>
            </div>
          </div>
          <div>
            <p className="text-base-content/85 max-w-[300px]">Complete the driver's license application form</p>
          </div>
        </div>
      </div>
    </section>
  )
}
