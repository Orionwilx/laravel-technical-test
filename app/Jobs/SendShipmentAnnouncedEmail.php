<?php

namespace App\Jobs;

use App\Mail\ShipmentAnnounced;
use App\Models\Shipment;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendShipmentAnnouncedEmail implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Shipment $shipment,
        public string $recipientEmail
    ) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->recipientEmail)->send(new ShipmentAnnounced($this->shipment));
    }
}
