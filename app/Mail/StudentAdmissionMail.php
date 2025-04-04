<?php

namespace App\Mail; 

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class StudentAdmissionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $formLink;

    public function __construct($formLink)
    {
        $this->formLink = $formLink;
    }

    public function build()
    {
        return $this->view('emails.admission_form');

    }
    

}
